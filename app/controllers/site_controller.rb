class SiteController < ApplicationController
  # before_action :set_user, only: [:show, :edit, :update, :destroy]
  # before_action :set_s3_direct_post, only: [:edit, :update]

  def index
    @user = current_user
    @fee_categories = FeeCategory.all
    @newUser = true
    @certifications = current_user.certifications
    @certification = current_user.certifications.first || {status: 0, user_id: @user.id, fiscal_start: nil, fiscal_end: nil}
    @view = render component: 'CertificationView', props: {
            certification: @certification,
            certifications: @certifications,
            artist_payments: @artist_payments,
            user: @user,
            newUser: @newUser,
            fee_categories: @fee_categories
          }, class: "certification certification--view"
    if current_user.certifications.length > 0
      @artist_payments = []
      if has_submitted(@certifications)
        @newUser = false
        render component: 'Dashboard', props: { certifications: @certifications, user: @user, fee_categories: @fee_categories}, class: 'dashboard'
      else
        @view
      end
    else
      @certifications = []
      @certification = {status: 0, user_id: @user.id, fiscal_start: nil, fiscal_end: nil}
      @view
    end
  end

  def guidelines
    render :template => 'site/_guidelines'
  end

  def fee_schedule
    @user = current_user
    @fee_categories = FeeCategory.all
    render component: 'FeeSchedule', props: { certification: @certification, user: @user, fee_categories: @fee_categories, floor_categories: @fee_categories}, class: 'fee_schedule'
  end

  def has_submitted(certifications)
    certifications.each do |certification|
      if certification.status >= 1
        return true
      end
    end
    return false
  end

  helper_method :resource_name, :resource, :devise_mapping

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
