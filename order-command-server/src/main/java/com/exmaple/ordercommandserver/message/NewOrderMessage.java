package com.exmaple.ordercommandserver.message;

import com.exmaple.ordercommandserver.dto.ItemDto;
import com.exmaple.ordercommandserver.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewOrderMessage {
    private String orderId;
    private Long userId;
    private String userName;
    private List<ItemDto> items = new ArrayList<>();
    private String createdAt;

    public NewOrderMessage(Order order) {
        this.orderId = order.getId();
        this.userId = order.getUser().getId();
        this.userName = order.getUser().getName();
        this.items = order.getItems().stream().map(ItemDto::new).toList();
        this.createdAt = order.getCreatedAt().toString();
    }
}
