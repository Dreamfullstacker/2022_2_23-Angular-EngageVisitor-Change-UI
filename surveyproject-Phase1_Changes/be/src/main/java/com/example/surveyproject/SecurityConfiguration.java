package com.example.surveyproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.session.SessionManagementFilter;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserAuthService userAuthService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private AuthenticationEntryPoint authEntryPoint;

	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

		//auth.apply()
		auth.userDetailsService(userAuthService).passwordEncoder(passwordEncoder);
		 auth.inMemoryAuthentication().withUser("evAdmin@ev.com")
		 .password(passwordEncoder.encode("bunty@123")).roles("ADMIN");
//		 auth.inMemoryAuthentication()
//         .withUser("user1").password(encoder().encode("$2a$04$2.Dv6SFWRez5fyN1t1dOH.xaGjPcQDVfNpNgXjeey8AOtMvIHjeUi"))
//         .authorities("ROLE_USER");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//				.antMatchers("/secured/**").access("hasRole('ROLE_USER')").antMatchers("/nonsecured/**").permitAll()
//				.anyRequest().authenticated().and().httpBasic();

		http.addFilterBefore(corsFilter(), SessionManagementFilter.class).csrf().disable().authorizeRequests()
				.antMatchers(HttpMethod.OPTIONS, "/**").permitAll().antMatchers("/open/**").permitAll()
				.antMatchers("/db/**").hasAnyRole("DBADMIN")
				.anyRequest()

				.authenticated()
				.and().httpBasic().authenticationEntryPoint(authEntryPoint);
		// http.authorizeRequests().antMatchers("/").permitAll();


//		.and()
//				.formLogin()
//				.loginPage("/auth/login")
//				.loginProcessingUrl("/j_spring_security_check")
//				.defaultSuccessUrl("/form-listing", true)
//				.failureUrl("/login")
//				.usernameParameter("email")
//				.passwordParameter("password")
//				.permitAll()
//				.and()
//				.logout()
//				.logoutUrl("/auth/logout")
//				.logoutSuccessUrl("/login")
//				.deleteCookies("JSESSIONID")
//				.clearAuthentication(true)
//				.invalidateHttpSession(true)
//				.and()
//				.exceptionHandling()
//				.accessDeniedPage("/login")
//				.and()
//				.httpBasic()
//				.authenticationEntryPoint(authEntryPoint);//<< implementing this interface

	}

//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return NoOpPasswordEncoder.getInstance();
//	}

	@Bean
	SimpleCorsFilter corsFilter() {
		SimpleCorsFilter filter = new SimpleCorsFilter();
		return filter;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		DaoAuthenticationProvider daoAuth = new DaoAuthenticationProvider();
		daoAuth.setUserDetailsService(userAuthService);
		daoAuth.setPasswordEncoder(passwordEncoder);



		auth.inMemoryAuthentication().passwordEncoder(passwordEncoder)
				.withUser("admin@ev.com").password(passwordEncoder.encode("ev&db@user")).roles("DBADMIN");

		auth.authenticationProvider(daoAuth);
	}



}
