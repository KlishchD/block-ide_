package com.blockide.blockide.model;

import lombok.Data;

@Data
public class ConvertRequest {

    private Graph graph;

    private String lang;
}
