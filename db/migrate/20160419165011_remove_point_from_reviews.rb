class RemovePointFromReviews < ActiveRecord::Migration
  def change
    remove_column :addresses, :facility, :boolean
  end
end
