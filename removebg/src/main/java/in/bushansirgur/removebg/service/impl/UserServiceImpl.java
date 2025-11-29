package in.bushansirgur.removebg.service.impl;

import in.bushansirgur.removebg.dto.UserDTO;
import in.bushansirgur.removebg.entity.UserEntity;
import in.bushansirgur.removebg.repository.UserRepository;
import in.bushansirgur.removebg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        Optional<UserEntity> optionalUser = userRepository.findByClerkId(userDTO.getClerkId());

        UserEntity user = optionalUser.orElse(new UserEntity());

        user.setClerkId(userDTO.getClerkId());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhotoUrl(userDTO.getPhotoUrl());

        if (userDTO.getCredits() != null) {
            user.setCredits(userDTO.getCredits());
        } else if (user.getCredits() == null) {
            user.setCredits(0); // Default if new user
        }

        UserEntity savedUser = userRepository.save(user);
        return mapToDTO(savedUser);
    }

    @Override
    public UserDTO getUserByClerkId(String clerkId) {
        UserEntity userEntity = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToDTO(userEntity);
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {
        UserEntity userEntity = userRepository.findByClerkId(clerkId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(userEntity);
    }

    private UserDTO mapToDTO(UserEntity newUser) {
        return UserDTO.builder()
                .clerkId(newUser.getClerkId())
                .credits(newUser.getCredits())
                .email(newUser.getEmail())
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .photoUrl(newUser.getPhotoUrl())
                .build();
    }

    private UserEntity mapToEntity(UserDTO userDTO) {
        UserEntity user = new UserEntity();
        user.setClerkId(userDTO.getClerkId());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhotoUrl(userDTO.getPhotoUrl());
        user.setCredits(userDTO.getCredits() != null ? userDTO.getCredits() : 0);
        return user;
    }
}
