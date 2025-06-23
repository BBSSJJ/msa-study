package com.exmaple.orderqueryserver.service;

import com.exmaple.orderqueryserver.dto.OrderQueryDto;
import com.exmaple.orderqueryserver.repository.OrderQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderQueryService {
    private final OrderQueryRepository orderQueryRepository;

    public List<OrderQueryDto> getAllOrders() {
        return orderQueryRepository.findAll()
                .stream()
                .map(OrderQueryDto::new)
                .toList();
    }
}
