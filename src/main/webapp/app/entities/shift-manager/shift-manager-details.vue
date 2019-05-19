<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="shiftManager">
                <h2 class="jh-entity-heading"><span>ShiftManager</span> {{shiftManager.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span>Name</span>
                    </dt>
                    <dd>
                        <span>{{shiftManager.name}}</span>
                    </dd>
                    <dt>
                        <span>Designation</span>
                    </dt>
                    <dd>
                        <span>{{shiftManager.designation}}</span>
                    </dd>
                    <dt>
                        <span>Mobile Number</span>
                    </dt>
                    <dd>
                        <span>{{shiftManager.mobileNumber}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span> Back</span>
                </button>
                <router-link v-if="shiftManager.id" :to="{name: 'ShiftManagerEdit', params: {shiftManagerId: shiftManager.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./shift-manager-details.component.ts">
</script>
