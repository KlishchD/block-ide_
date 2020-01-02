package com.blockide.blockide.model;

import lombok.Data;

import java.util.List;

@Data
public class BlockModel {

    private int id;

    private String name;

    private List<Argument> arguments;

    private Integer nextId;

    private List<Integer> childrenIds;
}
