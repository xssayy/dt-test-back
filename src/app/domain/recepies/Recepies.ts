import axios from "axios";

import {
  JsonController,
  Get,
  Post,
  Body,
  Param,
  QueryParam,
} from "routing-controllers";
import { IFilteredMeal, IRecepie, IRecepiesResponse } from "./Recepies.types";

import { ApiError } from "helpers/ApiError";
import { ApiResponse } from "helpers/ApiResponse";

@JsonController("/recepies")
export default class Recepies {
  @Get()
  async getAll() {
    const { data } = await axios.get<IRecepiesResponse>(
      `${process.env.BASE_URL}/search.php?s=`
    );

    return new ApiResponse(true, data);
  }

  @Get("/filter")
  async getByQuery(
    @QueryParam("ingredient") ingredient: string,
    @QueryParam("country") country: string,
    @QueryParam("category") category: string
  ) {
    let url = `${process.env.BASE_URL}/filter.php?`;

    if (ingredient) url += `i=${ingredient}`;
    if (country) url += `&a=${country}`;
    if (category) url += `&c=${category}`;

    const { data } = await axios.get<IFilteredMeal>(url);
    return new ApiResponse(true, data);
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const { data } = await axios.get<IRecepiesResponse>(
      `${process.env.BASE_URL}/lookup.php?i=${id}`
    );
    if (!data || !data.meals || data.meals.length === 0) {
      throw new ApiError(404, {
        code: "RECEPIE_NOT_FOUND",
        message: `Person with id ${id} not found`,
      });
    }
    return new ApiResponse(true, data);
  }
}
