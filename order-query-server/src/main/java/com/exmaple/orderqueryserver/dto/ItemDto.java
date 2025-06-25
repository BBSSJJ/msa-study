package com.exmaple.orderqueryserver.dto;

import com.exmaple.orderqueryserver.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long productId;
    private String productName;
    private int quantity;
    private int price;

    public ItemDto(Item item) {
        this.productId = item.getProductId();
        this.productName = item.getProductName();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
    }
}
