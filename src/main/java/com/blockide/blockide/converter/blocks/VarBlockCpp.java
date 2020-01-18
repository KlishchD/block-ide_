package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class VarBlockCpp extends Block {

    private static final String VARIABLE_TYPE = "variableType";

    private static final String VARIABLE_NAME = "variableName";

    private String variableType;

    private String variableName;

    public VarBlockCpp(BlockModel model) {
        super(model);
        for (Argument argument : model.getArguments()) {
            if (VARIABLE_NAME.equals(argument.getName())) {
                variableName = argument.getValue();
            } else if (VARIABLE_TYPE.equals(argument.getName())) {
                variableType = argument.getValue();
            }
        }
        if (variableType == null) {
            throw new IllegalArgumentException("Variable type is required for Var Block");
        }
        if (variableName == null) {
            throw new IllegalArgumentException("Variable name is required for Var Block");
        }
    }

    @Override
    public String generateCode() {
        String code;
        switch (variableType.toLowerCase()) {
            case "string":
                code = String.format("string %s;", variableName);
                break;
            case "int":
            case "integer":
                code = String.format("int %s;", variableName);
                break;
            case "boolean":
            case "bool":
                code = String.format("bool %s;", variableName);
                break;
            case "double":
                code = String.format("double %s;", variableName);
                break;
            case "char":
                code = String.format("char %s;", variableName);
                break;
            default:
                throw new IllegalArgumentException("Unsupported type for var cpp block. Type: " + variableType);
        }
        return code;
    }
}
