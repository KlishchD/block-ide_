package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class ReadBlockCpp extends Block {

    private static final String VARIABLE_NAME = "variableName";

    private String variableName;

    public ReadBlockCpp(BlockModel model) {
        super(model);
        if (model.getArguments() == null) {
            throw new IllegalArgumentException("Arguments are required for read block cpp");
        }
        for (Argument argument : model.getArguments()) {
            if (VARIABLE_NAME.equals(argument.getName())) {
                variableName = argument.getValue();
            }
        }
        if (variableName == null) {
            throw new IllegalArgumentException("Variable name is required for read block");
        }
    }

    @Override
    public String generateCode() {
        return "cin >> " + variableName + ";";
    }
}
