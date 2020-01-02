package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class WhileBlock extends Block {

    private static final String CONDITION = "condition";

    private static final String BODY = "child_0";

    private String condition;

    private String body;

    public WhileBlock(BlockModel model) {
        super(model);
        for (Argument argument : model.getArguments()) {
            if (CONDITION.equals(argument.getName())) {
                condition = argument.getValue();
            } else if (BODY.equals(argument.getName())) {
                body = argument.getValue();
            }
        }
        if (condition == null) {
            throw new IllegalArgumentException("Condition is reburied for while block");
        }
        if (body == null) {
            throw new IllegalArgumentException("Body is required for while block");
        }
    }

    @Override
    public String generateCode() {
        return String.format("while (%s) {\n%s}", condition, body);
    }
}
