import { trigger, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('0.7s', style({ opacity: 1 }))
        ]),
    ]);

export const fadeInAnimationForLoader =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimationForLoader', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('0.2s', style({ opacity: 1 }))
        ]),
    ]);