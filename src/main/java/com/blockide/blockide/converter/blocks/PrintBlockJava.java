package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class PrintBlockJava extends Block {

    private static final String TEXT = "text";

    private String text;

    public PrintBlockJava(BlockModel model) {
        super(model);
        if (model.getArguments() == null) {
            throw new IllegalArgumentException("Arguments are required for print block cpp");
        }
        for (Argument arguments : model.getArguments()) {
            if (TEXT.equals(arguments.getName())) {
                text = arguments.getValue();
            }
        }
        if (text == null) {
            throw new IllegalArgumentException("Text is required for print block");
        }
    }

    @Override
    public String generateCode() {
        return String.format("System.out.println(%s);", text);
    }
}
