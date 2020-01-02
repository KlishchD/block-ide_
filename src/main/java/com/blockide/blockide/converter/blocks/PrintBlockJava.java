package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class PrintBlockJava extends Block {

    private static final String EXPRESION = "expresion";

    private String expresion;

    public PrintBlockJava(BlockModel model) {
        super(model);
        if (model.getArguments() == null) {
            throw new IllegalArgumentException("Arguments are required for read block cpp");
        }
        for (Argument arguments : model.getArguments()) {
            if (EXPRESION.equals(arguments.getName())) {
                expresion = arguments.getValue();
            }
        }
        if (expresion == null) {
            throw new IllegalArgumentException("Variable name is required for print block");
        }
    }

    @Override
    public String generateCode() {
        return String.format("System.out.println(%s);", expresion);
    }
}
