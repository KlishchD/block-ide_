package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class AssignBlock extends Block {
    private static final String EXPRESION = "expresion";

    private static final String VARIABLE_NAME = "variableName";

    private String expresion;

    private String variableName;

    public AssignBlock(BlockModel model) {
        super(model);
        for (Argument argument : model.getArguments()) {
            if (EXPRESION.equals(argument.getName())) {
                expresion = argument.getValue();
            } else if (VARIABLE_NAME.equals(argument.getName())) {
                variableName = argument.getValue();
            }
        }
    }

    @Override
    public String generateCode() {
        return String.format("%s = %s;", variableName, expresion);
    }
}
