import { createClient } from '@/lib/supabase/server'
import { type ApplicationNote, type ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

type Params = { id: string }

// GET notes for application
export async function GET(_request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id: application_id } = await context.params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('application_notes')
      .select('*')
      .eq('application_id', application_id)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ success: true, data } as ApiResponse<ApplicationNote[]>)
  } catch (error) {
    console.error('GET /api/job-applications/[id]/notes error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST add note
export async function POST(request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id: application_id } = await context.params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: content' },
        { status: 400 }
      )
    }

    // Ensure application belongs to user
    const { data: app, error: appError } = await supabase
      .from('job_applications')
      .select('id')
      .eq('id', application_id)
      .eq('user_id', user.id)
      .single()

    if (appError || !app) {
      return NextResponse.json(
        { success: false, error: 'Job application not found' },
        { status: 404 }
      )
    }

    const { data, error } = await supabase
      .from('application_notes')
      .insert({
        application_id,
        user_id: user.id,
        content,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, data } as ApiResponse<ApplicationNote>,
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/job-applications/[id]/notes error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
