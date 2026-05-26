import { createClient } from '@/lib/supabase/server'
import { type Profile, type ApiResponse } from '@/lib/types'
import { NextRequest, NextResponse } from 'next/server'

// GET profile
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' } as const,
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Profile doesn't exist, return null
        return NextResponse.json({
          success: true,
          data: null,
        } as ApiResponse<Profile | null>)
      }
      throw error
    }

    return NextResponse.json({
      success: true,
      data,
    } as ApiResponse<Profile>)
  } catch (error) {
    console.error('GET /api/profiles error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT update profile
export async function PUT(request: NextRequest) {
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
    const { full_name, avatar_url, dark_mode } = body

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name,
        avatar_url,
        dark_mode,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      data,
    } as ApiResponse<Profile>)
  } catch (error) {
    console.error('PUT /api/profiles error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
