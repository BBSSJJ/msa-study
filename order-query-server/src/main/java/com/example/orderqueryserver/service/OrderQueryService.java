package com.example.orderqueryserver.service;

import com.example.orderqueryserver.dto.ListDto;
import com.example.orderqueryserver.dto.OrderQueryDto;
import com.example.orderqueryserver.entity.Order;
import com.example.orderqueryserver.repository.OrderQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderQueryService {
    private final OrderQueryRepository orderQueryRepository;

    public ListDto<OrderQueryDto> getAllOrders() {

        long startTime = System.currentTimeMillis();
        List<Order> orderList = orderQueryRepository.findAll();
        long elapsedTime = System.currentTimeMillis() - startTime;

        List<OrderQueryDto> orderQueryDtoList = orderList
                .stream()
                .map(OrderQueryDto::new)
                .toList();

        return new ListDto<OrderQueryDto>(orderQueryDtoList, elapsedTime);
    }
}
