package com.exmaple.ordercommandserver.controller;

import com.exmaple.ordercommandserver.dto.AddCartItemDto;
import com.exmaple.ordercommandserver.dto.CartItemDto;
import com.exmaple.ordercommandserver.dto.UpdateCartItemDto;
import com.exmaple.ordercommandserver.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @PostMapping("/users/{userId}")
    public ResponseEntity<Void> addCartItem(@PathVariable Long userId, @RequestBody AddCartItemDto addCartItemDto) {
        cartService.addCartItem(userId, addCartItemDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<CartItemDto>> getCartItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getAllCartItems(userId));
    }

    @PutMapping("/users/{userId}/cart-items/{cartItemId}")
    public ResponseEntity<Void> updateCartItemQuantity(@PathVariable Long userId, @PathVariable Long cartItemId, @RequestBody UpdateCartItemDto updateCartItemDto) {
        cartService.updateCartItem(userId, cartItemId, updateCartItemDto);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/users/{userId}/cart-items/{cartItemId}")
    public ResponseEntity<Void> deleteCartItemQuantity(@PathVariable Long userId, @PathVariable Long cartItemId) {
        cartService.deleteCartItem(userId, cartItemId);
        return ResponseEntity.ok(null);
    }
}
