package com.example.surveyproject.model;

import javax.persistence.*;

@Entity
@NamedQuery(name = "Theme.findAll", query = "SELECT t FROM Theme t")
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "background")
    @Lob
    private String backgroundData;

    @Column(name="bgtype")
    private String bgType;

    @Column(name="bgcolor")
    private String bgColor;
    @Column(name="questioncolor")
    private String questionColor;
    @Column(name="answercolor")
    private String answerColor;
    @Column(name="buttoncolor")
    private String buttonColor;
    @Column(name="buttontextcolor")
    private String buttonTextColor;
    @Column(name="showquestionnumber")
    private boolean showQuestionNumber;
    private float opacity;

    @Transient
    private int backgroundType;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    

    public String getBackgroundData() {
        return backgroundData;
    }

    public void setBackgroundData(String backgroundData) {
        this.backgroundData = backgroundData;
    }

    public String getBgType() {
        return bgType;
    }

    public void setBgType(String bgType) {
        this.bgType = bgType;
    }

    public String getBgColor() {
        return bgColor;
    }

    public void setBgColor(String bgColor) {
        this.bgColor = bgColor;
    }

    public String getQuestionColor() {
        return questionColor;
    }

    public void setQuestionColor(String questionColor) {
        this.questionColor = questionColor;
    }

    public String getAnswerColor() {
        return answerColor;
    }

    public void setAnswerColor(String answerColor) {
        this.answerColor = answerColor;
    }

    public String getButtonColor() {
        return buttonColor;
    }

    public void setButtonColor(String buttonColor) {
        this.buttonColor = buttonColor;
    }

    public String getButtonTextColor() {
        return buttonTextColor;
    }

    public void setButtonTextColor(String buttonTextColor) {
        this.buttonTextColor = buttonTextColor;
    }

    public boolean isShowQuestionNumber() {
        return showQuestionNumber;
    }

    public void setShowQuestionNumber(boolean showQuestionNumber) {
        this.showQuestionNumber = showQuestionNumber;
    }
    public int getBackgroundType() {
        if(bgType !=null && bgType.toLowerCase().startsWith("image"))
            return 1;
        else if(bgType !=null && bgType.toLowerCase().startsWith("video"))
            return 2;
        return 0;
    }

    public float getOpacity() {
        return opacity/10;
    }

    public void setOpacity(float opacity) {
        this.opacity = opacity*10;
    }


}
