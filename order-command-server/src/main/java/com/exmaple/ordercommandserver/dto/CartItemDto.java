package com.exmaple.ordercommandserver.dto;

import com.exmaple.ordercommandserver.entity.CartItem;
import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {

    private Long id;

    private Long userId;

    private Long productId;

    private String productName;

    private int price;

    private int quantity;

    public CartItemDto(CartItem cartItem) {
        this.id = cartItem.getId();
        this.userId = cartItem.getUser().getId();
        this.productId = cartItem.getProduct().getId();
        this.productName = cartItem.getProduct().getName();
        this.price = cartItem.getProduct().getPrice();
        this.quantity = cartItem.getQuantity();
    }
}
