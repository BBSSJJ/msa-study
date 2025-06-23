package com.exmaple.ordercommandserver.service;

import com.exmaple.ordercommandserver.dto.ProductDto;
import com.exmaple.ordercommandserver.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductDto::new)
                .toList();
    }
}
