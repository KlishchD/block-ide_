package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class IfBlock extends Block {

    private static final String CONDITION = "condition";

    private static final String BODY = "child_0";

    private static final String ELSE_BODY = "child_1";

    private String condition;

    private String body;

    private String elseBody;

    public IfBlock(BlockModel model) {
        super(model);
        for (Argument argument : model.getArguments()) {
            if (CONDITION.equals(argument.getName())) {
                condition = argument.getValue();
            } else if (BODY.equals(argument.getName())) {
                body = argument.getValue();
            } else if (ELSE_BODY.equals(argument.getName())) {
                elseBody = argument.getValue();
            }
        }
        if (condition == null) {
            throw new IllegalArgumentException("Condition is required for if block");
        }
        if (body == null) {
            throw new IllegalArgumentException("Body is required for if block");
        }
    }

    @Override
    public String generateCode() {
        StringBuilder code = new StringBuilder();
        code.append(String.format("if (%s) {\n%s}", condition, body));
        if (elseBody != null) {
            code.append(String.format(" else {\n%s}", elseBody));
        }
        return code.toString();
    }
}
