package com.exmaple.ordercommandserver.controller;

import com.exmaple.ordercommandserver.dto.OrderQueryDto;
import com.exmaple.ordercommandserver.service.OrderQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderQueryController {

    private final OrderQueryService orderQueryService;

    @GetMapping()
    ResponseEntity<List<OrderQueryDto>> getAllOrders() {
        return ResponseEntity.ok(orderQueryService.getAllOrders());
    }

}
