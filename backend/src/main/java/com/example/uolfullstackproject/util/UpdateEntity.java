package com.example.uolfullstackproject.util;

import java.beans.PropertyDescriptor;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

public class UpdateEntity {
  public static void copyNonNullOrListProperties(Object source, Object target) {
    BeanUtils.copyProperties(source, target, getNullPropertyName(source));
  }
  public static String[] getNullPropertyName(Object source) {
    final BeanWrapper src = new BeanWrapperImpl(source);
    PropertyDescriptor[] pds = src.getPropertyDescriptors();

    Set<String> collectionOrEmptyNames = new HashSet<>();
    for (PropertyDescriptor pd : pds) {
      Object srcValue = src.getPropertyValue(pd.getName());
      if (srcValue == null || srcValue instanceof Collection<?> || pd.getName().equals("id") || pd.getName().equals("cpf")) {
        collectionOrEmptyNames.add(pd.getName());
      }
    }

    String[] result = new String[collectionOrEmptyNames.size()];
    return collectionOrEmptyNames.toArray(result);
  }

}
