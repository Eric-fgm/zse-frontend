import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";

// @ts-ignore

export default function useQuery<T>(
  fetcher: AsyncThunk<any, any, any>,
  getter: T
  // @ts-ignore
): ReturnType<T> {
  const dispatch = useDispatch();
  const { search } = useLocation();

  // @ts-ignore
  const data = useSelector(getter) as ReturnType<T>;

  useLayoutEffect(() => {
    console.log(search);
    // @ts-ignore
    dispatch(fetcher(search));
  }, [dispatch, fetcher, getter]);

  return data;
}
