import { createClient } from '@/lib/supabase/server'
import { type ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

type Params = { id: string; stackId: string }

export async function DELETE(_request: NextRequest, context: { params: Promise<Params> }) {
  try {
    const { id: application_id, stackId } = await context.params
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
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

    const { error } = await supabase
      .from('application_stacks')
      .delete()
      .eq('id', stackId)
      .eq('application_id', application_id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true, data: null } as ApiResponse<null>)
  } catch (error) {
    console.error('DELETE /api/job-applications/[id]/stacks/[stackId] error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
