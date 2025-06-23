package com.exmaple.ordercommandserver.service;

import com.exmaple.ordercommandserver.dto.AddCartItemDto;
import com.exmaple.ordercommandserver.dto.CartItemDto;
import com.exmaple.ordercommandserver.dto.UpdateCartItemDto;
import com.exmaple.ordercommandserver.entity.CartItem;
import com.exmaple.ordercommandserver.entity.Product;
import com.exmaple.ordercommandserver.entity.User;
import com.exmaple.ordercommandserver.repository.CartRepository;
import com.exmaple.ordercommandserver.repository.ProductRepository;
import com.exmaple.ordercommandserver.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CartService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void addCartItem(Long userId, AddCartItemDto addCartItemDto) {
        Product product = productRepository.getReferenceById(addCartItemDto.getProductId());
        User user = userRepository.getReferenceById(userId);
        CartItem cartItem = cartRepository.findByUserAndProduct(user, product);

        if (cartItem == null) {
            CartItem newCartItem = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(addCartItemDto.getQuantity())
                    .build();
            cartRepository.save(newCartItem);
            return;
        }
        int quantity = cartItem.getQuantity();
        cartItem.updateQuantity(quantity + addCartItemDto.getQuantity());
        cartRepository.save(cartItem);
    }

    public List<CartItemDto> getAllCartItems(Long userId) {
        User user = userRepository.getReferenceById(userId);
        return cartRepository.findAllByUser(user).stream().map(CartItemDto::new).toList();
    }

    public void updateCartItem(Long userId, Long cartItemId, UpdateCartItemDto updateCartItemDto) {
        CartItem cartItem = cartRepository.getReferenceById(cartItemId);
        if (!Objects.equals(cartItem.getUser().getId(), userId)) return;
        cartItem.updateQuantity(updateCartItemDto.getQuantity());
        cartRepository.save(cartItem);
    }

    public void deleteCartItem(Long userId, Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }
}
