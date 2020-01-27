package com.blockide.blockide.model;

import lombok.Data;

@Data
public class RunRequest {
    private ConvertRequest convertRequest;

    private String input;
}
