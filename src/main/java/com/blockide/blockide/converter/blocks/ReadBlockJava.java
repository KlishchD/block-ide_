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
        String code;
        switch (variableType.toLowerCase()) {
            case "string":
                code = String.format("%s = scanner.next()", variableName);
                break;
            case "int":
                code = String.format("%s = scanner.nextInt();", variableName);
                break;

            case "boolean":
                code = String.format("%s = scanner.nextBoolean();", variableName);
                break;
            case "double":
                code = String.format("%s = scanner.nextDouble();", variableName);
                break;
            case "char":
                code = String.format("%s = scanner.nextChar();", variableName);
                break;
            default:
                throw new IllegalArgumentException("Unsupported type for read java block. Type: " + variableType);
        }
        return code;
    }
}
