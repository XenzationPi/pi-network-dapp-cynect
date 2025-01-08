import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user_id from request
    const { user_id } = await req.json();

    if (!user_id) {
      throw new Error('User ID is required');
    }

    // Get user's current points and achievements
    const { data: userRewards, error: rewardsError } = await supabase
      .from('user_rewards')
      .select('points, total_contributions')
      .eq('user_id', user_id)
      .single();

    if (rewardsError) throw rewardsError;

    // Get user's achievements
    const { data: achievements, error: achievementsError } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('user_id', user_id);

    if (achievementsError) throw achievementsError;

    // Generate personalized recommendations
    const recommendations = {
      nextAchievement: null,
      suggestedActions: [],
      potentialRewards: 0
    };

    // Find next achievement to unlock
    const { data: nextAchievement } = await supabase
      .from('achievements')
      .select('*')
      .gt('required_points', userRewards?.points || 0)
      .order('required_points', { ascending: true })
      .limit(1)
      .single();

    if (nextAchievement) {
      recommendations.nextAchievement = nextAchievement;
      recommendations.potentialRewards = nextAchievement.required_points - (userRewards?.points || 0);
    }

    // Get action suggestions based on token distribution rules
    const { data: actions } = await supabase
      .from('token_distribution_rules')
      .select('*')
      .order('tokens_awarded', { ascending: false })
      .limit(3);

    recommendations.suggestedActions = actions || [];

    return new Response(
      JSON.stringify(recommendations),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-recommendations:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});