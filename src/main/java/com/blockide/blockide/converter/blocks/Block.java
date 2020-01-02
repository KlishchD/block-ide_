package com.blockide.blockide.converter.blocks;

import com.blockide.blockide.model.BlockModel;

public abstract class Block {

    protected BlockModel blockModel;

    public Block(BlockModel model) {
        this.blockModel = model;
    }

    public abstract String generateCode();
}
