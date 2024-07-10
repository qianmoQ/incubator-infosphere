package org.devlive.infosphere.service.service;

import org.devlive.infosphere.common.response.CommonResponse;
import org.devlive.infosphere.service.adapter.PageAdapter;
import org.devlive.infosphere.service.entity.BookEntity;
import org.springframework.data.domain.Pageable;

public interface BookService
{
    CommonResponse<PageAdapter<BookEntity>> getAll(Boolean visibility, Pageable pageable);

    CommonResponse<BookEntity> getByIdentify(String identify);

    CommonResponse<BookEntity> saveAndUpdate(BookEntity configure);
}
