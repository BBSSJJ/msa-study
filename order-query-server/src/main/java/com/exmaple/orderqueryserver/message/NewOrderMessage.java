package com.exmaple.orderqueryserver.message;

import com.exmaple.orderqueryserver.dto.ItemDto;
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
}