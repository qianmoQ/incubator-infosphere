package org.devlive.wikift.server.controller;

import org.devlive.wikift.common.CommonResponse;
import org.devlive.wikift.common.JwtResponse;
import org.devlive.wikift.service.entity.UserEntity;
import org.devlive.wikift.service.service.UserService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/user")
public class UserController
{
    private final UserService service;

    public UserController(UserService service)
    {
        this.service = service;
    }

    @PostMapping("/signin")
    public CommonResponse<JwtResponse> signing(@RequestBody UserEntity configure)
    {
        UserEntity user = new UserEntity();
        user.setUsername(configure.getUsername());
        user.setPassword(configure.getPassword());
        return this.service.signing(user);
    }

    @RequestMapping(value = "register", method = RequestMethod.POST)
    CommonResponse<UserEntity> register(@RequestBody @Validated UserEntity configure)
    {
        return service.save(configure);
    }
}
