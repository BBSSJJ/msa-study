package com.example.orderqueryserver.controller;

import com.example.orderqueryserver.dto.ListDto;
import com.example.orderqueryserver.dto.OrderQueryDto;
import com.example.orderqueryserver.service.OrderQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderQueryController {

    private final OrderQueryService orderQueryService;

    @GetMapping()
    ResponseEntity<ListDto<OrderQueryDto>> getAllOrders() {
        return ResponseEntity.ok(orderQueryService.getAllOrders());
    }

    @GetMapping("/{id}")
    ResponseEntity<OrderQueryDto> getOrderById(@PathVariable("id") Long id) {
        return null;
    }

}
