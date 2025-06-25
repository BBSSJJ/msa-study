package com.exmaple.orderqueryserver.entity;

import com.exmaple.orderqueryserver.dto.ItemDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {
    private Long productId;
    private String productName;
    private int quantity;
    private int price;

    public Item(ItemDto itemDto) {
        this.productId = itemDto.getProductId();
        this.productName = itemDto.getProductName();
        this.quantity = itemDto.getQuantity();
        this.price = itemDto.getPrice();
    }
}