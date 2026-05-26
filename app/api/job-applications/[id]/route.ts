import { createClient } from '@/lib/supabase/server'
import { type JobApplication, type ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

type Params = { id: string }

// GET one job application
export async function GET(_request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data } as ApiResponse<JobApplication>)
  } catch (error) {
    console.error('GET /api/job-applications/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update fields
export async function PATCH(request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const body = await request.json()

    const updates = { ...(body ?? {}) } as Record<string, unknown>

    // Never allow changing ownership/identity fields
    delete updates.user_id
    delete updates.id
    delete updates.created_at

    const { data, error } = await supabase
      .from('job_applications')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data } as ApiResponse<JobApplication>)
  } catch (error) {
    console.error('PATCH /api/job-applications/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE job application
export async function DELETE(_request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true, data: null } as ApiResponse<null>)
  } catch (error) {
    console.error('DELETE /api/job-applications/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
