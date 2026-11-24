"use server"

import { authFetch } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getUserPremiumById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return response.json()
}

export const getUsers = async () => {
  const res = await authFetch(`${BASE_URL}/users`)
  return res.json()
}
