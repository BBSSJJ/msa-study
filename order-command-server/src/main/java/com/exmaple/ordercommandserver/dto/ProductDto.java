package com.exmaple.ordercommandserver.dto;

import com.exmaple.ordercommandserver.entity.Product;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ProductDto {
    private Long id;
    private String name;
    private int price;
    private int quantity;
    public ProductDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.quantity = product.getQuantity();
    }
}
