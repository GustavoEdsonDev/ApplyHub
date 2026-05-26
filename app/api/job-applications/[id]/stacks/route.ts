import { createClient } from '@/lib/supabase/server'
import { type ApplicationStack, type ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

type Params = { id: string }

// GET stacks for application
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
      .from('application_stacks')
      .select('*')
      .eq('application_id', application_id)
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data } as ApiResponse<ApplicationStack[]>)
  } catch (error) {
    console.error('GET /api/job-applications/[id]/stacks error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST add stack item
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
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: name' },
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
      .from('application_stacks')
      .insert({
        application_id,
        user_id: user.id,
        name,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { success: true, data } as ApiResponse<ApplicationStack>,
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/job-applications/[id]/stacks error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
