package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class ReadBlockJava extends Block {

    private static final String VARIABLE_NAME = "variableName";

    private static final String VARIABLE_TYPE = "variableType";

    private String variableName;

    private String variableType;

    public ReadBlockJava(BlockModel model) {
        super(model);
        for (Argument argument : model.getArguments()) {
            if (VARIABLE_NAME.equals(argument.getName())) {
                variableName = argument.getValue();
            } else if (VARIABLE_TYPE.equals(argument.getName())) {
                variableType = argument.getValue();
            }
        }
        if (variableName == null) {
            throw new IllegalArgumentException("Variable name is required for read block");
        }
    }

    @Override
    public String generateCode() {
        if ("int".equalsIgnoreCase(variableType)) {
            return variableName + " = scanner.nexInt();";
        }
        throw new IllegalArgumentException("Unsupported type for read java block. Type: " + variableType);
    }
}
