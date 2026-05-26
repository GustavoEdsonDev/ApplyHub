import { createClient } from '@/lib/supabase/server'
import { type JobApplication, type ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

// GET all job applications for current user
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const favorite = searchParams.get('favorite')

    let query = supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (favorite === 'true') {
      query = query.eq('is_favorite', true)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
    } as ApiResponse<JobApplication[]>)
  } catch (error) {
    console.error('GET /api/job-applications error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new job application
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      company_name,
      job_title,
      job_url,
      salary,
      salary_currency = 'BRL',
      work_mode = 'remote',
      seniority = 'junior',
      status = 'saved',
      is_favorite = false,
      applied_at,
      deadline,
    } = body

    // Validate required fields
    if (!company_name || !job_title) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: company_name, job_title' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('job_applications')
      .insert({
        user_id: user.id,
        company_name,
        job_title,
        job_url,
        salary,
        salary_currency,
        work_mode,
        seniority,
        status,
        is_favorite,
        applied_at,
        deadline,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      {
        success: true,
        data,
      } as ApiResponse<JobApplication>,
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/job-applications error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
