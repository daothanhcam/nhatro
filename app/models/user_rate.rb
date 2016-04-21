class UserRate < ActiveRecord::Base
  belongs_to :address
  belongs_to :user

  validates :user, presence: true, uniqueness: {scope: :address}
  validates :address, presence: true
  validates :point, presence: true
  validates_inclusion_of :point, :in => 0..10

  PARAMS_ATTRIBUTES = [:user_id, :address_id, :point]
end
