import { conn } from '@/libs/mysql'
import { ApiResponse, ApiResponseError, ApiResponseWithReturn, OperationFromDB, OperationToDB } from '@/types'
import { getQueryParams } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import { OkPacket } from 'mysql'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams: URLSearchParams } = req.nextUrl
    const { queryParamsComplete, queryParamsNoLimit } = getQueryParams({
      likeColumn: '',
      orderByColumn: 'operationId',
      paramsCols: ['transactionId'],
      URLSearchParams
    })
    const operations = await conn.query<OperationFromDB[]>(`
    SELECT operationId, description, serialNumber, unitCost, quantity, importSale, details, productId, transactionId FROM OPERATIONS
    ${queryParamsComplete}`)
    const operationsNoLimit = await conn.query<OperationFromDB[]>(`SELECT operationId FROM OPERATIONS ${queryParamsNoLimit}`)
    const totalTransactions = await conn.query<OperationFromDB[]>('SELECT operationId FROM OPERATIONS')

    if (operations) {
      return NextResponse.json<ApiResponseWithReturn<OperationFromDB[]>>({
        ok: true,
        message: 'Operaciones encontradas',
        data: operations,
        meta: {
          rowsObtained: operationsNoLimit.length,
          totalRows: totalTransactions.length
        }
      })
    }

    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Error en la consulta'
    }, { status: 400 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const data: OperationToDB = await req.json()
    const resDB = await conn.query<OkPacket>(`
    INSERT INTO OPERATIONS SET ?`, [data])

    if (resDB.affectedRows > 0) {
      return NextResponse.json<ApiResponse>({
        ok: true,
        message: 'Operación insertada',
        data: {
          insertId: resDB.insertId,
          ...data
        }
      })
    }
    return NextResponse.json<ApiResponse>({
      ok: false,
      message: 'Error en la consulta'
    }, { status: 400 })
  } catch (error) {
    return NextResponse.json<ApiResponseError>({
      error,
      message: 'Ocurrió un error'
    }, { status: 500 })
  }
}