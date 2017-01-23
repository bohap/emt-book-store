package com.finki.emt.bookstore.web.rest.response;

import java.io.Serializable;

public class ErrorResponse implements Serializable {

    private int code;

    private String status;

    private String message;

    public ErrorResponse() {
    }

    public ErrorResponse(int code, String status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
