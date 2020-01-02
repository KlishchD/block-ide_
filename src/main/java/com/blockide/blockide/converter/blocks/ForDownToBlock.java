package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.Argument;
import com.blockide.blockide.model.BlockModel;

public class ForDownToBlock extends Block{

    private static final String LOVER_BOUND = "lowerBound";

    private static final String UPPER_BOUND = "upperBound";

    private static final String BODY = "child_0";

    private String loverBound;

    private String upperBound;

    private String body;

    public ForDownToBlock(BlockModel model) {
        super(model);
        for (Argument argument : model.getArguments()) {
            if (LOVER_BOUND.equals(argument.getName())) {
                loverBound = argument.getValue();
            } else if (UPPER_BOUND.equals(argument.getName())) {
                upperBound = argument.getValue();
            } else if (BODY.equals(argument.getName())) {
                body = argument.getValue();
            }
        }
        if (loverBound == null) {
            throw new IllegalArgumentException("Lover bound is required for For down to block");
        }
        if (upperBound == null) {
            throw new IllegalArgumentException("Upper bound is required for For down to block");
        }
        if (body == null) {
            throw new IllegalArgumentException("Body is required for For down to block");
        }
    }

    @Override
    public String generateCode() {
        return String.format("for (int i = %s; i > %s; --i) {\n%s}", upperBound, loverBound, body);
    }
}
