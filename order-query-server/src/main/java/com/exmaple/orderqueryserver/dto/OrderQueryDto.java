package com.exmaple.orderqueryserver.dto;

import com.exmaple.orderqueryserver.entity.Item;
import com.exmaple.orderqueryserver.entity.Order;
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
        this.userId = order.getUserId();
        this.userName = order.getUserName();
        for (Item item : order.getItems()) {
            this.items.add(new ItemDto(item));
        }
        this.createdAt = order.getCreatedAt();
    }
}