package com.exmaple.ordercommandserver.dto;

import com.exmaple.ordercommandserver.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long productId;
    private int quantity;
    private int price;

    public ItemDto(Item item) {
        this.productId = item.getId();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
    }
}
