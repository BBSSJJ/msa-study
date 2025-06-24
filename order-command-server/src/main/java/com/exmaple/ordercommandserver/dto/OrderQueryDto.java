package com.exmaple.ordercommandserver.dto;

import com.exmaple.ordercommandserver.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderQueryDto {
    private String orderId;
    private Long userId;
    private String userName;
    private List<ItemDto> items = new ArrayList<>();
    private LocalDateTime createdAt;

    public OrderQueryDto(Order order) {
        this.orderId = order.getId();
        this.userId = order.getUser().getId();
        this.userName = order.getUser().getName();
        this.items = order.getItems().stream().map(ItemDto::new).toList();
        this.createdAt = order.getCreatedAt();
    }
}