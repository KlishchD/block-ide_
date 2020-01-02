package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.BlockModel;

public class StartBlock extends Block {
    public StartBlock(BlockModel model) {
        super(model);
    }

    @Override
    public String generateCode() {
        return "";
    }
}
