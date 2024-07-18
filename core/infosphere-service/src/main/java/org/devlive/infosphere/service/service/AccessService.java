package org.devlive.infosphere.service.service;

import org.devlive.infosphere.common.response.CommonResponse;
import org.devlive.infosphere.service.entity.AccessEntity;

import javax.servlet.http.HttpServletRequest;

public interface AccessService
{
    /**
     * 记录访问历史
     *
     * @param identify 书籍唯一标识
     * @return 访问历史
     */
    CommonResponse<AccessEntity> save(String identify, HttpServletRequest request);
}
